import type {
  IEditorBlock,
  IEditorData,
  IImageBlock,
  ITextBlock,
} from "@/types";
import { acceptHMRUpdate, defineStore } from "pinia";

export const useEditorStore = defineStore("editor", {
  state: () => ({
    data: null as IEditorData | null,
  }),

  actions: {
    initialize() {
      this.data = {
        blocks: [],
      };
    },
    // add a new block to the list
    addBlock(block: IEditorBlock) {
      if (!this.data) return;
      this.data.blocks.push(block);
    },
    // remove a block from the list
    removeBlock(blockId: string) {
      const index = this.data?.blocks.findIndex(
        (block) => block.id === blockId
      );
      if (index === undefined || index < 0 || !this.data) return;
      this.data.blocks.splice(index, 1);
    },
    // reorder blocks in the list by swapping them
    reorderBlocks(sourceIndex: number, destinationIndex: number) {
      if (!this.data) return;
      const [removed] = this.data.blocks.splice(sourceIndex, 1);
      this.data.blocks.splice(destinationIndex, 0, removed);
    },
    // init a dragging block data when start dragging from side menu
    generateEmptyBlock(type: IEditorBlock["type"]): IEditorBlock["data"] {
      return type === "text"
        ? this.generateEmptyTextBlock()
        : this.generateEmptyImageBlock();
    },
    generateEmptyTextBlock(): ITextBlock {
      return {
        id: `text-${Date.now()}`,
        content: "",
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
  },

  getters: {
    // Define your getters here
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useEditorStore, import.meta.hot));
}
