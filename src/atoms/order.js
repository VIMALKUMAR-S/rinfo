import { atom } from 'recoil'

export const allOrderState = atom(
    {
        key: "allOrderState",
        default: []
    }
)
export const userOrderState = atom(
    {
        key: "userOrderState",
        default: []
    }
)