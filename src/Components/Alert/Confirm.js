
import icon from '../../Img/delete.gif'
import './Alert.css'

export const Confirm = ({msg="", ID=0 ,Confirm, handleDelete}) => {

    const handleClick = async()=>{

      const result = await handleDelete(ID)
  
      if(result) {
        Confirm({
          isDeleted: true
        })
      }
      
    }

    const handleCancel = ()=>{
      Confirm({
        Confirm:false
      })
    }

  return (
    <div className='AlertCont'>

        <div className='AlertCard'>
            <img alt='' src={icon}/>
            <h3>{msg+" "+ID}</h3>
            <div className='btnBox'>
            <button className ='cardButton DeleteBTN' onClick={handleClick}>Eliminar</button>
            <button className ='cardButton CancelBTN' onClick={handleCancel}>Cancelar</button>
            </div>
        </div>

    </div>
  )
}

//https://i.gifer.com/7efs.gif