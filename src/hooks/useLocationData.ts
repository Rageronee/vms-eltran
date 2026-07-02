import { useState, useEffect } from 'react';

// Endpoints API Terbuka yang sangat andal untuk data Wilayah & Negara
const API_PROVINSI = 'https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json';
const API_COUNTRIES = 'https://restcountries.com/v3.1/all?fields=name,cca2';

export interface LocationOption {
  id: string;
  name: string;
}

export const useLocationData = () => {
  const [countries, setCountries] = useState<LocationOption[]>([]);
  const [provinces, setProvinces] = useState<LocationOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch Negara
  const fetchCountries = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(API_COUNTRIES);
      const data = await res.json();
      
      const formattedData = data.map((country: any) => ({
        id: country.cca2,
        name: country.name.common,
      })).sort((a: LocationOption, b: LocationOption) => a.name.localeCompare(b.name));
      
      setCountries(formattedData);
    } catch (error) {
      console.error("Gagal mengambil data negara:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch Provinsi Indonesia
  const fetchProvinces = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(API_PROVINSI);
      const data = await res.json();
      
      const formattedData = data.map((prov: any) => ({
        id: prov.id,
        name: prov.name,
      }));
      
      setProvinces(formattedData);
    } catch (error) {
      console.error("Gagal mengambil data provinsi:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch Kabupaten/Kota berdasarkan ID Provinsi
  const fetchRegencies = async (provinceId: string) => {
    try {
      const res = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`);
      const data = await res.json();
      return data.map((regency: any) => ({
        id: regency.id,
        name: regency.name,
      }));
    } catch (error) {
      console.error("Gagal mengambil data kabupaten:", error);
      return [];
    }
  };

  // Fetch Kecamatan berdasarkan ID Kabupaten
  const fetchDistricts = async (regencyId: string) => {
    try {
      const res = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${regencyId}.json`);
      const data = await res.json();
      return data.map((district: any) => ({
        id: district.id,
        name: district.name,
      }));
    } catch (error) {
      console.error("Gagal mengambil data kecamatan:", error);
      return [];
    }
  };

  useEffect(() => {
    fetchCountries();
    fetchProvinces();
  }, []);

  return {
    countries,
    provinces,
    fetchRegencies,
    fetchDistricts,
    isLoading
  };
};
