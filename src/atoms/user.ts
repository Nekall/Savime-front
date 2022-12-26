import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'
const { persistAtom } = recoilPersist()

type UserDataState = {
  id: number | null;
  role: string | null;
  firstname: string | null;
  lastname: string | null;
  email: string | null;
  job: string | null;
  profilePicture: any;
};

export const userDataState = atom<UserDataState>({
  key: "userDataState",
  default: {
    id: null,
    role: null,
    firstname: null,
    lastname: null,
    email: null,
    job: null,
    profilePicture: null
  },
  effects_UNSTABLE: [persistAtom],
});

export const tokenState = atom<string | null>({
  key: "tokenState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
