import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);


export const getEquipments = async()=>{
    let { data } = await supabase.from('Equipo').select('*');
    return data
}
export const addEquipment = async(Equipment)=>{
    const {data} = await supabase
    .from('Equipo')
    .insert([Equipment])
    .select();
    
  return data
}
export const getEquipmentsByRange= async(from=0, to=0)=>{
  let {data, count } = await supabase.from('Equipo').select('*', { count: 'exact' }).range(from,to)
  return {data, count}
}
export const getEquipmentByID = async(EquipmentID)=>{
  let { data } = await supabase.from('Equipo').select('*').eq('ID',EquipmentID);
  return data
}
export const updateEquipment =async(Equipment,EquipmentID)=>{
  const { data } = await supabase
  .from('Equipo')
  .update(Equipment)
  .match({ ID: EquipmentID})
  .select();
  return data;
}
export const deleteEquipment = async(EquipmentID)=>{
  const { data } = await supabase
  .from('Equipo')
  .delete()
  .eq('ID', EquipmentID)
  .select()

  return data
}
export const getEquipmetByUser = async(UserID)=>{
  let { data } = await supabase.from('Equipo').select().match({Usuario:UserID})
  return data
}
export const getAvailableEquipments = async()=>{
  let  data  = await supabase.from('Equipo').select().match({Usuario:"0"})
  return data
}



export const getUsers = async()=>{
  let { data } = await supabase.from('Usuario').select('*');
  return data
}
export const addUser = async(User)=>{
  const {data} = await supabase
  .from('Usuario')
  .insert([User])
  .select();
  
return data
}
export const getUserByRange= async(from=0, to=0)=>{
let {data, count } = await supabase.from('Usuario').select('*,Departamento(Nombre)', { count: 'exact' }).range(from,to)
return {data, count}
}
export const getUserByID = async(UserID)=>{
let { data } = await supabase.from('Usuario').select('*').eq('ID',UserID);
return data
}
export const updateUser =async(User,UserID)=>{
const { data } = await supabase
.from('Usuario')
.update(User)
.match({ ID: UserID})
.select();
return data;
}
export const deleteUser = async(UserID)=>{
const { data } = await supabase
.from('Usuario')
.delete()
.eq('ID', UserID)
.select()
return data
}
export const getUserRol = async()=>{
  let { data } = await supabase.from('Rol').select('*');
  return data
}
export const LoginWithEmailAndPassword = async(Email,Password)=>{
  let { data } = await supabase.from('Usuario').select().match({Correo:Email, Password:Password})
  return data
}


export const getDepartments = async()=>{
  let { data } = await supabase.from('Departamento').select('*');
  return data
}


export const getIncidents = async()=>{
  let { data } = await supabase.from('Incidente').select(`
  ID,
  Created_at,
  Usuario(*,
    Departamento(Nombre)),
  Prioridad(ID,Nombre)
  `).filter('Status','not.eq','2')
  return data;
}
export const getIncidentByID = async(IncidentID)=>{
  let { data } = await supabase.from('Incidente').select(`
  ID,
  Comentario,
  Respuesta,
  Created_at,
  Equipo (*), 
  Usuario(*,
    Departamento(Nombre)),
  Status(Nombre),
  Prioridad(ID,Nombre)
  `).eq('ID',IncidentID);
  return data
}
export const SendIncidentMessage = async(IncidentMessage,IncidentID)=>{
  const { data } = await supabase
  .from('Incidente')
  .update(IncidentMessage)
  .match({ID: IncidentID})
  .select();
  return data;
}
export const getIncidentsByUser = async(UserID)=>{
  let { data } = await supabase.from('Incidente').select(`
   *,
   Prioridad(ID,Nombre),
   Usuario(Nombre,Apellido,
    Departamento(Nombre))
   `).match({ID_User:UserID})
   .filter('Status','not.eq','2')
  return data
}
export const CreateIncident = async(Incident)=>{
  const {data} = await supabase
    .from('Incidente')
    .insert([Incident])
    .select();
    
  return data
}
export const CloseIncident = async(IncidentID)=>{
  const {data} = await supabase
    .from('Incidente')
    .update({
      Prioridad:3,
      Status:2
    })
    .match({ID:IncidentID})
    .select();
    
  return data
}






