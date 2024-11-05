import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserDetails } from "../@types";

export const storeUser = async (value: UserDetails) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("user", jsonValue);
  } catch (e) {
    return null;
  }
};

export const getUser = async (): Promise<UserDetails | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem("user");
    return JSON.parse(jsonValue);
  } catch (e) {
    return null;
  }
};
