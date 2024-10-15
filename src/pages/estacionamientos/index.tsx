import ListaEstacionamientos from "@/components/ListaEstacionamientos";
import Layout, { Container } from "@/components/Layout";
import axios from "axios";
import { Typography } from '@mui/material'
import type { Estacionamiento } from "@prisma/client";
import { useEffect, useState } from "react";
import { handleAxiosError } from "@/utils/Snackbar";

export default function Estacionamientos(){
    const [estacionamientos, setEstacionamientos] = useState<Estacionamiento[]>([])
    
    const cargarEstacionamientos = async () => {
        try{
            const res = await axios.get<Estacionamiento[]>('/api/estacionamientos')
            setEstacionamientos(res.data)
        }
        catch(err){
            handleAxiosError(err)
        }
    }

    useEffect(() => {
        cargarEstacionamientos()
    }, [])

    return (
        <Layout
            title="Areas de estacionamiento"
            description="Busca entre los estacionamientos disponibles"
        >
            <Container>
                {/* <Typography variant="h6">
                    Estacionamientos
                </Typography> */}
                <Typography sx={{marginBottom: 2, textAlign: 'justify'}}>
                    Elige un area de estacionamiento.
                </Typography>
                <ListaEstacionamientos estacionamientos={estacionamientos}/>
            </Container>
        </Layout>
    )
}