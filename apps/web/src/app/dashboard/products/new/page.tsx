import { ProductUploadForm } from "@/components/dashboard/ProductUploadForm";

export default function NewProductPage() {
  return (
    <div className="grid gap-8">
      <div>
        <p className="metric text-sm">PRODUCT UPLOAD</p>
        <h1 className="mt-2 text-4xl font-semibold">Create a Fit.VR-ready garment.</h1>
      </div>
      <ProductUploadForm />
    </div>
  );
}
