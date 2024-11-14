import {SidebarMenuButton, SidebarMenuItem} from "@/components/ui/sidebar.tsx";
import {useDraggable} from "@dnd-kit/core";

type Item = {
    name: string,
    icon: any
}
export default function SidebarDraggableItem(props: {
    children: React.ReactNode,
    item: Item, idx: number }) {
    const key = `sidebar-item-${props.item.name}-${props.idx}`;
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: key,
        data: { item: props.item },
    });

    const style = {
        transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 100px)`
            : undefined,
        opacity: isDragging ? 0.5 : 1,
    };
    return (
        <div
            className={"cursor-move"}
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
        >
            {props.children}
        </div>
    );

}