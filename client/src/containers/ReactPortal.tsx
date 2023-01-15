import { useRef, useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

export default function AppPortal({
  children,
  selector,
}: {
  children: ReactNode;
  selector: string;
}) {
  const ref = useRef<Element>();
  const [mount, setMount] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(selector) as HTMLElement;
    setMount(true);
  }, [selector]);

  return mount ? createPortal(children, ref.current as HTMLElement) : null;
}
