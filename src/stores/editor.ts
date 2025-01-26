import type {
  IEditorBlock,
  IEditorData,
  IImageBlock,
  ITextBlock,
} from "@/types";
import { acceptHMRUpdate, defineStore } from "pinia";

type TDropPosition = {
  to: "top" | "bottom";
  blockId: string;
};

export const useEditorStore = defineStore("editor", {
  state: () => ({
    data: null as IEditorData | null,
    draggingBlockId: null as string | null,
    dropPosition: null as TDropPosition | null,
  }),
  getters: {
    blocks: (state) => state.data?.blocks ?? [],
  },
  actions: {
    initialize() {
      this.data = {
        blocks: [],
      };
    },
    // get block index
    getBlockIndex(blockId: string) {
      if (!this.data) return -1;
      return this.data.blocks.findIndex((block) => block.id === blockId);
    },
    // add a new block to the list
    addBlock(block: IEditorBlock) {
      if (!this.data) return;
      // if there's drop position, we need to append the block to it
      if (this.dropPosition) {
        const dropPositionBlockIndex = this.data.blocks.findIndex(
          (b) => b.id === this.dropPosition?.blockId
        );
        if (dropPositionBlockIndex > -1) {
          if (this.dropPosition.to === "top") {
            this.data.blocks.splice(dropPositionBlockIndex, 0, block);
          } else {
            this.data.blocks.splice(dropPositionBlockIndex + 1, 0, block);
          }
          this.setDropPosition(null); // clear the drop position after add block
          return;
        }
      }
      this.data.blocks.push(block);
    },
    // duplicate a block in the list
    duplicateBlock(blockId: string) {
      if (!this.data) return;
      const index = this.getBlockIndex(blockId);
      if (index < 0) return;
      const block = this.data.blocks[index];
      this.data.blocks.splice(index + 1, 0, {
        ...block,
        id: `block-${Date.now()}`,
      });
    },
    // remove a block from the list
    removeBlock(blockId: string) {
      if (!this.data) return;
      const index = this.getBlockIndex(blockId);
      if (index < 0) return;
      this.data.blocks.splice(index, 1);
    },
    // move block up in the list
    moveBlockUp(blockId: string) {
      if (!this.data) return;
      const index = this.getBlockIndex(blockId);
      if (index <= 0) return;
      const removed = this.data.blocks.splice(index, 1);
      this.data.blocks.splice(index - 1, 0, ...removed);
    },
    // move block down in the list
    moveBlockDown(blockId: string) {
      if (!this.data) return;
      const index = this.getBlockIndex(blockId);
      if (index < 0 || index >= this.data.blocks.length - 1) return;
      const removed = this.data.blocks.splice(index, 1);
      this.data.blocks.splice(index + 1, 0, ...removed);
    },
    // reorder blocks in the list by swapping them
    reorderBlocks(sourceIndex: number, destinationIndex: number) {
      if (!this.data) return;
      const [removed] = this.data.blocks.splice(sourceIndex, 1);
      this.data.blocks.splice(destinationIndex, 0, removed);
    },
    // update block data by id
    updateBlock(blockId: string, data: ITextBlock | IImageBlock) {
      if (!this.data) return;
      const index = this.getBlockIndex(blockId);
      if (index < 0) return;
      this.data.blocks[index].data = data;
    },
    // init a dragging block data when start dragging from side menu
    generateEmptyBlock(type: IEditorBlock["type"]): IEditorBlock {
      const id = `block-${Date.now()}`;
      if (type === "text") {
        return {
          id,
          type,
          data: this.generateEmptyTextBlock(),
        };
      } else {
        return {
          id: `block-${Date.now()}`,
          type,
          data: this.generateEmptyImageBlock(),
        };
      }
    },
    generateEmptyTextBlock(): ITextBlock {
      return {
        id: `text-${Date.now()}`,
        content: "Feel free to type something here...",
        textAlign: "left",
        fontSize: 16,
        fontFamily: "var(--font-family)",
        color: "var(--color-primary)",
      };
    },
    generateEmptyImageBlock(): IImageBlock {
      return {
        id: `image-${Date.now()}`,
        src: "",
        alignment: "center",
        width: "100%",
        height: "auto",
      };
    },
    moveBlock(fromIndex: number, toIndex: number) {
      if (!this.data) return;
      const blocks = [...this.blocks];
      const [movedBlock] = blocks.splice(fromIndex, 1);

      // Adjust target index if moving forward to account for removed element
      const finalTargetIndex = fromIndex < toIndex ? toIndex - 1 : toIndex;
      blocks.splice(finalTargetIndex, 0, movedBlock);

      this.data.blocks = blocks;
    },
    // during dragging events
    setDragging(blockId: string | null) {
      this.draggingBlockId = blockId;
    },
    setDropPosition(pos: TDropPosition | null) {
      this.dropPosition = pos;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useEditorStore, import.meta.hot));
}
