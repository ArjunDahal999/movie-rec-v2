import Link from 'next/link'
import { MovieDataType } from './section/featured-section'
import Image from 'next/image'

const MovieCard = ({data}:{data:MovieDataType}) => {
  return (
    <Link href={`/movie/${data.title}`} className='  flex flex-col  p-2 rounded-md  border h-72 w-[200px]  overflow-hidden flex-shrink-0  '>
      <Image alt='movie' height={400} width={200} className=' flex-shrink-0 object-cover h-[250px] w-[200px] ' src={'/placeholder.svg'} /> 
      <p className=' text-xs '>{data.title}</p>
      <div className=" flex justify-between">
      <h1 className=' text-[10px]'>{data.director}</h1>
      <h1 className=' text-[10px]'>{data.release_date}</h1>
      </div>

    </Link>  
  )
}

export default MovieCard
