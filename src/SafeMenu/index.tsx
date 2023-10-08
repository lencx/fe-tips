import { useState, useRef, useMemo } from 'react';

import SafeArea from './SafeArea';
import './App.css';

const MenuPlaceholder = () => (
  <div>
    <span>Option</span>
    <b className="ml-1">➡️</b>
  </div>
);

const MenuOption = () => {
  const [open, setOpen] = useState(false);
  const parent = useRef<HTMLLIElement>(null);
  const child = useRef<HTMLDivElement>(null);

  const getTop = useMemo(() => {
    const height = child.current?.offsetHeight;
    return height ? `-${height / 2 - 15}px` : 0;
  }, [child]);

  return (
    <li
      ref={parent}
      style={{ position: "relative" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <MenuPlaceholder />

      <div
        className="absolute"
        style={{
          visibility: open ? 'visible' : 'hidden',
          left: parent.current?.offsetWidth || 0,
          top: getTop,
        }}
        ref={child}
      >
        <ul>
          {Array.from({ length: 6 }).map((_, idx) => <li key={+idx}>Option {idx + 1}</li>)}
        </ul>
      </div>
    </li>
  );
};

const SafeAreaOption = () => {
  const [open, setOpen] = useState(false);
  const parent = useRef<HTMLLIElement | null>(null);
  const child = useRef<HTMLDivElement | null>(null);

  const getTop = useMemo(() => {
    const height = child.current?.offsetHeight;
    return height ? `-${height / 2 - 15}px` : 0;
  }, [child]);

  return (
    <li
      ref={parent}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <MenuPlaceholder />

      {open && parent.current && child.current && (
        <SafeArea anchor={parent.current} submenu={child.current} />
      )}

      <div
        className="absolute"
        style={{
          visibility: open ? 'visible' : 'hidden',
          left: parent.current?.offsetWidth || 0,
          top: getTop,
        }}
        ref={child}
      >
        <ul>
          {Array.from({ length: 6 }).map((_, idx) => <li key={+idx}>Option {idx + 1}</li>)}
        </ul>
      </div>
    </li>
  );
};

export default function MenuDemo() {
  return (
    <div className="App">
      <div className="flex w-full flex-col">
        <div className="w-full bg-red-600/30 p-10">
          <h2>Before</h2>
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <MenuOption />
            <li>Option 3</li>
            <li>Option 4</li>
          </ul>
        </div>
        <div className="w-full bg-teal-600/30 p-10">
          <h2>After</h2>
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <SafeAreaOption />
            <li>Option 3</li>
            <li>Option 4</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
