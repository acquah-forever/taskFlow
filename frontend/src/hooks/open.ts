import { useState } from "react";

export function useToggle() {
    const [open, setOpen] = useState<number | null>(null);

    function handleClick(index: number) {
        setOpen((prev) => (prev === index ? null : index));
    }

    return { open, handleClick };
}