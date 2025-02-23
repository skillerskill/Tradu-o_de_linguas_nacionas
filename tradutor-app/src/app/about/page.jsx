"use client";
import Head from "next/head";
import { useRouter } from "next/navigation";

export default function About(){
    const router = useRouter();
    return (   
  
    <>
        <li> Bem-Vindos a whatlike </li>
        <button onClick={() => router.push("/")}>Voltar</button>
    </>
    );
}