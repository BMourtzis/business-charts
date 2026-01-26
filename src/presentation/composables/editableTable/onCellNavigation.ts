import { NavigationDirection } from "@/presentation/viewModels/navigation";

interface NavigationOptions {
    allowArrowNavigation?: boolean;
}

type NavigateEmit = (e: 'navigate', direction: NavigationDirection) => void;

export function useCellNavigation(
    emit: NavigateEmit,
    options: NavigationOptions = {}
) {
    const {
        allowArrowNavigation = true
    } = options;

    function onKeydown(e: KeyboardEvent) {
        let direction: NavigationDirection | null = null;
        switch(e.key) {
            case "Enter":
                direction = e.shiftKey ? NavigationDirection.Up : NavigationDirection.Down;
                break;
            case "Tab":
                direction = e.shiftKey ? NavigationDirection.Left : NavigationDirection.Right;
                break;
        }

        if(!direction) return;

        e.preventDefault();
        e.stopPropagation();
        emit('navigate', direction);
    }

    return {
        onKeydown
    };
}