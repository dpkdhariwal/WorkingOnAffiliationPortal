// SwalManager.js
import Swal from "sweetalert2";

class SwalManager {
    static defaultConfig = {
        allowOutsideClick: false,
        allowEscapeKey: false,
    };

    static async confirm(title, text, confirmText = "Yes") {
        const result = await Swal.fire({
            ...this.defaultConfig,
            title,
            text,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: confirmText,
            cancelButtonText: "Cancel",
        });
        return result.isConfirmed;
    }

    static async confirmSave() {
        return this.confirm(
            "Are you sure?",
            "Do you want to save the form data?",
            "Yes, save it!"
        );
    }

    static async confirmDelete() {
        return this.confirm(
            "Are you sure?",
            "This action cannot be undone!",
            "Yes, delete it!"
        );
    }

    static async success(message) {
        return Swal.fire({
            ...this.defaultConfig,
            icon: "success",
            title: "Success",
            text: message,
            //   timer: 2000,
            confirmButtonText: "okay",
            showConfirmButton: true,
        });
    }

    static async error(message) {
        return Swal.fire({
            ...this.defaultConfig,
            icon: "error",
            title: "Error",
            text: message,
        });
    }

    // NEW — Show loading dialog
    static showLoading(message = "Processing...") {
        Swal.fire({
            ...this.defaultConfig,
            title: message,
            didOpen: () => {
                Swal.showLoading();
            },
            showConfirmButton: false,
        });
    }

    // NEW — Hide any open dialog
    static hide() {
        Swal.close();
    }
}

export default SwalManager;
