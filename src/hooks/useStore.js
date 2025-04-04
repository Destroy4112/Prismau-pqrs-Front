import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";


export const useAppSelector = useSelector;
export const useAppDispatch = useDispatch;

export const appQueryCliente = QueryClient;
export const useAppQueryClient = useQueryClient;
export const useAppQuery = useQuery;
export const useAppMutation = useMutation;