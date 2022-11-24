import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'
const { persistAtom } = recoilPersist()

type UserDataState = {
  id: number | null;
  firstname: string | null;
  lastname: string | null;
  email: string | null;
  job: string | null;
};

export const userDataState = atom<UserDataState>({
  key: "userDataState",
  default: {
    id: null,
    firstname: null,
    lastname: null,
    email: null,
    job: null,
  },
  effects_UNSTABLE: [persistAtom],
});

export const tokenState = atom<string | null>({
  key: "tokenState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
