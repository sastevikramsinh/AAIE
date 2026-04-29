import { useEffect, useState } from "react";

export default function useInViewOnce(targetRef, options) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = targetRef?.current;
    if (!el) return;
    if (inView) return;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetRef, inView]);

  return inView;
}

