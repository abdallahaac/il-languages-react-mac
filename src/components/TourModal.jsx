import React, {
	useEffect,
	useMemo,
	useRef,
	useState,
	useCallback,
} from "react";
import "./TourModal.css";

/**
 * Step shape:
 * {
 *   target?: string | null,         // element to spotlight; null => center the card
 *   title: string,
 *   body: string,
 *   interact?: boolean,             // default true — allow clicks through spotlight
 *   dimOthers?: boolean,            // default true — render overlay; set false for welcome step
 *   dimWithin?: string | null,      // limit dimming to this container (e.g., ".navigation-section")
 *   onEnter?: (helpers) => void | Promise<void>,
 *   autoNextDelay?: number,
 *   scrollToTarget?: boolean,       // default true
 *   recalcDelay?: number,           // default 250ms
 *   waitForTarget?: boolean,        // default true
 *   waitTimeout?: number            // default 3000ms
 * }
 */
export default function TourModal({ steps = [], isOpen, onClose }) {
	const [index, setIndex] = useState(0);
	const [rect, setRect] = useState(null); // page-space rect of target
	const [visible, setVisible] = useState(false);
	const observerRef = useRef(null);
	const timersRef = useRef([]);
	const prevTargetRef = useRef(null);

	const step = steps[index];

	// ---------- logging ----------
	const log = useCallback(
		(level, ...args) => {
			const prefix = `%c[Tour] step ${index}${
				step?.title ? `: ${step.title}` : ""
			}`;
			const style = "color:#005a9c;font-weight:600";
			(console[level] || console.log)(prefix, style, ...args);
		},
		[index, step]
	);

	const clearTimers = () => {
		timersRef.current.forEach(clearTimeout);
		timersRef.current = [];
	};

	// ---------- dom helpers ----------
	const getEl = useCallback(
		(sel) => {
			if (!sel) return null;
			const el = document.querySelector(sel);
			if (!el) log("warn", `Selector not found:`, sel);
			return el;
		},
		[log]
	);

	const waitFor = useCallback(
		(sel, { timeout = 3000, interval = 50 } = {}) =>
			new Promise((resolve, reject) => {
				const start = performance.now();
				const tick = () => {
					const el = getEl(sel);
					if (el) return resolve(el);
					if (performance.now() - start >= timeout) {
						log("error", `Timed out waiting for`, sel);
						return reject(new Error(`waitFor timeout: ${sel}`));
					}
					timersRef.current.push(setTimeout(tick, interval));
				};
				tick();
			}),
		[getEl, log]
	);

	const addFocus = useCallback(
		(el) => {
			if (!el) return;
			el.classList.add("tour-focus");
			el.classList.add("tour-nudge");
			prevTargetRef.current = el;
			log("info", "Applied tour-focus to", el);
		},
		[log]
	);

	const removeFocus = useCallback(() => {
		const prev = prevTargetRef.current;
		if (prev) {
			prev.classList.remove("tour-focus");
			prev.classList.remove("tour-nudge");
			prevTargetRef.current = null;
			log("info", "Removed tour-focus");
		}
	}, [log]);

	// ---------- geometry ----------
	const updateRect = useCallback(() => {
		if (!step || !step.target) {
			setRect(null);
			return;
		}
		const el = getEl(step.target);
		if (!el) {
			setRect(null);
			return;
		}
		const r = el.getBoundingClientRect();
		setRect({
			top: r.top + window.scrollY,
			left: r.left + window.scrollX,
			width: r.width,
			height: r.height,
		});
	}, [step, getEl]);

	// compute 4 blocker rectangles inside a root area (viewport or a container)
	const computeBlocks = useCallback((hole, rootRect) => {
		const clamp = (v, a, b) => Math.min(Math.max(v, a), b);
		const vw = window.innerWidth,
			vh = window.innerHeight;

		const root = rootRect || { top: 0, left: 0, right: vw, bottom: vh };
		const topR = root.top,
			leftR = root.left,
			rightR = root.right,
			bottomR = root.bottom;

		if (!hole) {
			// no hole => just dim whole root
			return {
				top: {
					top: topR,
					left: leftR,
					width: rightR - leftR,
					height: bottomR - topR,
				},
				left: null,
				right: null,
				bottom: null,
				center: null,
			};
		}

		// hole in viewport coords
		const vLeft = clamp(hole.left - window.scrollX, leftR, rightR);
		const vTop = clamp(hole.top - window.scrollY, topR, bottomR);
		const vRight = clamp(
			hole.left - window.scrollX + hole.width,
			leftR,
			rightR
		);
		const vBottom = clamp(
			hole.top - window.scrollY + hole.height,
			topR,
			bottomR
		);

		const blocks = {
			top: {
				top: topR,
				left: leftR,
				width: rightR - leftR,
				height: Math.max(0, vTop - topR),
			},
			left: {
				top: vTop,
				left: leftR,
				width: Math.max(0, vLeft - leftR),
				height: Math.max(0, vBottom - vTop),
			},
			right: {
				top: vTop,
				left: vRight,
				width: Math.max(0, rightR - vRight),
				height: Math.max(0, vBottom - vTop),
			},
			bottom: {
				top: vBottom,
				left: leftR,
				width: rightR - leftR,
				height: Math.max(0, bottomR - vBottom),
			},
			center: {
				top: vTop,
				left: vLeft,
				width: Math.max(0, vRight - vLeft),
				height: Math.max(0, vBottom - vTop),
			},
		};
		return blocks;
	}, []);

	const prev = useCallback(() => {
		log("info", "Back ←", Math.max(0, index - 1));
		setIndex((i) => Math.max(0, i - 1));
	}, [index, log]);

	const next = useCallback(() => {
		setIndex((i) => {
			if (i === steps.length - 1) {
				log("info", "Tour finished");
				onClose?.();
				return i;
			}
			log("info", "Next →", i + 1);
			return i + 1;
		});
	}, [onClose, steps.length, log]);

	// init/uninit on open/close only
	useEffect(() => {
		if (!isOpen) return;
		setIndex(0);
		setVisible(true);

		const onResizeScroll = () => updateRect();
		window.addEventListener("resize", onResizeScroll);
		window.addEventListener("scroll", onResizeScroll, { passive: true });

		observerRef.current = new MutationObserver(updateRect);
		observerRef.current.observe(document.body, {
			attributes: true,
			childList: true,
			subtree: true,
		});

		const onKey = (e) => {
			if (e.key === "Escape") onClose?.();
			if (e.key === "ArrowRight") next();
			if (e.key === "ArrowLeft") prev();
		};
		window.addEventListener("keydown", onKey);

		console.info("%c[Tour]", "color:#005a9c;font-weight:700", "Opened");
		return () => {
			window.removeEventListener("resize", onResizeScroll);
			window.removeEventListener("scroll", onResizeScroll);
			window.removeEventListener("keydown", onKey);
			observerRef.current?.disconnect();
			setVisible(false);
			clearTimers();
			removeFocus();
			console.info("%c[Tour]", "color:#005a9c;font-weight:700", "Closed");
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen]);

	// per-step
	useEffect(() => {
		if (!isOpen || !step) return;
		let cancelled = false;

		const run = async () => {
			log("info", "Enter step", { index, step });
			removeFocus();

			try {
				const shouldWait = step.waitForTarget !== false && step.target;
				let el = null;

				if (shouldWait) {
					try {
						el = await waitFor(step.target, {
							timeout: step.waitTimeout ?? 3000,
						});
					} catch (e) {
						log("warn", "Continuing without target after timeout");
					}
				} else if (step.target) {
					el = getEl(step.target);
				}

				if (step.scrollToTarget !== false && el) {
					el.scrollIntoView({ behavior: "smooth", block: "center" });
				}

				if (el) addFocus(el);

				if (typeof step.onEnter === "function") {
					await step.onEnter({
						waitFor,
						getEl,
						log,
						next,
						prev,
						nudge(selector = step.target) {
							const t = getEl(selector);
							if (t) {
								t.classList.add("tour-nudge");
								setTimeout(() => t.classList.remove("tour-nudge"), 800);
							}
						},
					});
				}
			} catch (e) {
				log("error", e);
			} finally {
				const delay =
					typeof step.recalcDelay === "number" ? step.recalcDelay : 250;
				const t1 = setTimeout(() => !cancelled && updateRect(), delay);
				timersRef.current.push(t1);

				if (typeof step.autoNextDelay === "number") {
					const t2 = setTimeout(() => !cancelled && next(), step.autoNextDelay);
					timersRef.current.push(t2);
				}
			}
		};

		run();
		return () => {
			cancelled = true;
			clearTimers();
		};
	}, [
		isOpen,
		index,
		step,
		updateRect,
		waitFor,
		getEl,
		addFocus,
		removeFocus,
		log,
		next,
		prev,
	]);

	// keep rect fresh
	useEffect(() => {
		if (!isOpen) return;
		updateRect();
		const t = setTimeout(updateRect, 30);
		return () => clearTimeout(t);
	}, [isOpen, index, updateRect]);

	// card position
	const tooltipStyle = useMemo(() => {
		if (!rect)
			return { top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
		const margin = 16;
		const top = rect.top + rect.height + margin - window.scrollY;
		const left = rect.left + rect.width / 2 - window.scrollX;
		return {
			top: Math.max(margin, top),
			left,
			transform: "translate(-50%, 0)",
		};
	}, [rect]);

	// root area to dim (viewport by default or a container for this step)
	const rootRect = useMemo(() => {
		if (!step?.dimOthers) return null; // no overlay at all
		const rootEl = step?.dimWithin ? getEl(step.dimWithin) : null;
		if (!rootEl) return null; // null means use full viewport in render below
		const r = rootEl.getBoundingClientRect();
		return {
			top: Math.max(0, r.top),
			left: Math.max(0, r.left),
			right: Math.min(window.innerWidth, r.right),
			bottom: Math.min(window.innerHeight, r.bottom),
		};
	}, [step, getEl]);

	// build blockers
	const blocks = useMemo(() => {
		if (step?.dimOthers === false) return null; // no overlay
		const hole = rect ? { ...rect } : null; // page rect
		const b = computeBlocks(hole, rootRect); // viewport-space blocks
		return b;
	}, [rect, rootRect, step, computeBlocks]);

	if (!isOpen) return null;
	const interact = step?.interact !== false; // default true

	return (
		<div
			className={`tour-root ${visible ? "tour-root--in" : ""}`}
			role="dialog"
			aria-modal="true"
		>
			{/* Overlay: only render if dimOthers !== false */}
			{blocks ? (
				<>
					{/* If rootRect is null, these cover entire viewport; otherwise only the container space. */}
					{blocks.top && (
						<div className="tour-blocker" style={blocks.top} onClick={next} />
					)}
					{blocks.left && (
						<div className="tour-blocker" style={blocks.left} onClick={next} />
					)}
					{blocks.right && (
						<div className="tour-blocker" style={blocks.right} onClick={next} />
					)}
					{blocks.bottom && (
						<div
							className="tour-blocker"
							style={blocks.bottom}
							onClick={next}
						/>
					)}
					{!interact && blocks.center && (
						<div
							className="tour-center-blocker"
							style={blocks.center}
							onClick={next}
						/>
					)}
				</>
			) : null}

			{/* Tooltip */}
			<div
				className="tour-card"
				style={tooltipStyle}
				onClick={(e) => e.stopPropagation()}
			>
				<h3 className="tour-title">{step?.title}</h3>
				<p className="tour-body">{step?.body}</p>

				<div className="tour-actions">
					<button className="tour-btn" onClick={onClose} aria-label="Skip tour">
						Skip
					</button>
					<div className="tour-spacer" />
					<button
						className="tour-btn"
						onClick={prev}
						disabled={index === 0}
						aria-label="Previous"
					>
						Back
					</button>
					<button
						className="tour-btn tour-btn--primary"
						onClick={() => {
							log("info", "Next clicked");
							next();
						}}
						aria-label="Next"
					>
						{index === steps.length - 1 ? "Done" : "Next"}
					</button>
				</div>

				<div className="tour-dots" aria-hidden="true">
					{steps.map((_, i) => (
						<span
							key={i}
							className={`tour-dot ${i === index ? "active" : ""}`}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
