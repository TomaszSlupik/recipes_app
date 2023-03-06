import { useEffect } from "react";

export default function useTitlewebside (title) {
    useEffect(() => {
        document.title = title
    }, [title])
}