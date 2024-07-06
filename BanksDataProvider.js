import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL,
  process.env.EXPO_PUBLIC_SUPABASE_KEY
);

export const useBanksData = () => {
  //ESTADOS DE DATA, CARGANDO, ERROR
  const [banksData, setBanksData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      //PRIMER PASO SELECCIONAMOS LA DATA DE SUPABASE
      let { data: supabaseData, error: supabaseError } = await supabase
        .from("banks")
        .select("*");

      if (supabaseError) {
        throw supabaseError;
      }
      //SI HAY INFORMACION GUARDALA EN MI ESTADO
      if (supabaseData && supabaseData.length > 0) {
        setBanksData(supabaseData);
      }
      //SI NO HAY,OBTENLA DEL ENDPOINT Y
      else {
        const response = await fetch(
          "https://dev.obtenmas.com/catom/api/challenge/banks"
        );
        const apiData = await response.json();
        console.log("apiData", apiData);

        const { error: insertError } = await supabase
          .from("banks")
          .insert(apiData);

        if (insertError) {
          throw insertError;
        }

        setBanksData(apiData);
      }
    } catch (err) {
      console.error("Error fetching or inserting data:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { banksData, loading, error };
};
