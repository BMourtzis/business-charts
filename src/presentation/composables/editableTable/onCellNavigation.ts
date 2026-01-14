import { NavigationDirection } from "@/presentation/viewModels/navigation";

interface NavigationOptions {
    allowArrowNavigation?: boolean;
}

export function useCellNavigation(
    emit: (e: 'navigate', direction: NavigationDirection) => void,
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
            case "ArrowUp":
                if(allowArrowNavigation) direction = NavigationDirection.Up;
                break;
            case "ArrowDown":
                if(allowArrowNavigation) direction = NavigationDirection.Down;
                break;
            case "ArrowLeft":
                if(allowArrowNavigation) direction = NavigationDirection.Left;
                break;
            case "ArrowRight":
                if(allowArrowNavigation) direction = NavigationDirection.Right;
                break;
        }

        if(direction === null) return;

        e.preventDefault();
        emit('navigate', direction);
    }

    return {
        onKeydown
    };
}