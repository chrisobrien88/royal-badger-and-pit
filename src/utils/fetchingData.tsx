import Axios from "axios";
import { useState, useEffect } from "react";


export const getPlayers = async () => {
    try {
      await Axios.get(
        "https://cerise-iguana-kit.cyclic.app/api/players"
      ).then((response) => {
        return response.data;
      });
    } catch (err) {
      console.log(err);
    }
  };
  