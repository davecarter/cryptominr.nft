// Temporarily comment out these imports until we implement UI components
/*
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
*/

export const Modal = ({ onClose, onConfirm, open }) => {
  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 flex items-center justify-center">
      <div 
        className="relative w-full max-w-md rounded-lg border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-top-[2%] data-[state=open]:slide-in-from-top-[2%]"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex flex-col space-y-1.5 text-left">
          <h3 className="text-lg font-semibold leading-none tracking-tight">Confirm Delete</h3>
          <p className="text-sm text-muted-foreground">
            This action cannot be undone.
          </p>
        </div>
        <div className="mt-4">
          <p className="mb-4">Are you sure you want to delete all blocks from the blockchain?</p>
        </div>
        <div className="flex justify-end gap-2">
          <button 
            onClick={onClose}
            className="shadcn-button shadcn-button-secondary px-4 py-2 h-9"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className="shadcn-button shadcn-button-destructive px-4 py-2 h-9"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};