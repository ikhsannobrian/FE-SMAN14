import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormTA from "../components/FormTA";

const FormUpdateTA = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulasi pengambilan data dari API
        setIsLoading(true);
        const dummyData = {
          nama: "Anisa Rahmah Kusuma",
          angkatan: "15",
          tahunlulus: "2021",
          kategori: "Sekolah Kedinasan",
          instansi: "UPN VETERAN JAKARTA",
          programstudi: "Sistem Informasi",
        };

        // Simulasi delay API
        await new Promise((resolve) => setTimeout(resolve, 500));
        setData(dummyData);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleUpdate = async (updatedData) => {
    try {
      console.log("Data diperbarui:", updatedData);
      // Simulasi API call untuk update
      // await updateTracerAlumniAPI(id, updatedData);

      // Return promise yang resolve untuk menandakan update berhasil
      return Promise.resolve();
    } catch (error) {
      console.error("Gagal memperbarui data:", error);
      return Promise.reject(error);
    }
  };

  return <FormTA initialData={data} onSubmit={handleUpdate} />;
};

export default FormUpdateTA;
