
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://koqbspboipfrrkvaoxhn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvcWJzcGJvaXBmcnJrdmFveGhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njc1MjM0OTMsImV4cCI6MTk4MzA5OTQ5M30.sn4D3oS8ROY9mF1Quji7_yhf5RoGswAj8a-dNbpeNJ4'
const supabase = createClient(supabaseUrl, supabaseKey)


export const getEquipos = async()=>{
    let { data } = await supabase.from('Equipo').select('*');
    return data
}

export const insertEquipos = async(Equipo)=>{
    const {data} = await supabase
    .from('Equipo')
    .insert([Equipo])
    .select();
    
  return data
}

export const getEquiposByRange= async(from=0, to=0)=>{
  let {data, count } = await supabase.from('Equipo').select('*', { count: 'exact' }).range(from,to)
  return {data, count}
}

export const getEquiposByID = async(ID)=>{
  let { data } = await supabase.from('Equipo').select('*').eq('ID',ID);
  return data
}


export const UpdateEquipos =async(Equipo,ID)=>{
  const { data } = await supabase
  .from('Equipo')
  .update(Equipo)
  .match({ ID: ID})
  .select();
  return data;
}

export const deleteEquipos = async(ID)=>{
  const { data } = await supabase
  .from('Equipo')
  .delete()
  .eq('ID', ID)
  .select()

  return data
}


export const getUsuarios = async()=>{
  let { data } = await supabase.from('Usuario').select('*');
  return data
}

export const insertUsuarios = async(Usuario)=>{
  const {data} = await supabase
  .from('Usuario')
  .insert([Usuario])
  .select();
  
return data
}

export const getUsuarioByRange= async(from=0, to=0)=>{
let {data, count } = await supabase.from('Usuario').select('*', { count: 'exact' }).range(from,to)
return {data, count}
}

export const getUsuarioByID = async(ID)=>{
let { data } = await supabase.from('Usuario').select('*').eq('ID',ID);
return data
}


export const UpdateUsuario =async(Usuario,ID)=>{
const { data } = await supabase
.from('Usuario')
.update(Usuario)
.match({ ID: ID})
.select();
return data;
}

export const deleteUsuario = async(ID)=>{
const { data } = await supabase
.from('Usuario')
.delete()
.eq('ID', ID)
.select()
return data
}

export const getDepartamentos = async()=>{
  let { data } = await supabase.from('Departamento').select('*');
  return data
}


export const getRol = async()=>{
  let { data } = await supabase.from('Rol').select('*');
  return data
}
