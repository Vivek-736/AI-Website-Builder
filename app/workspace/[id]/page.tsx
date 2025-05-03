import ChatView from '@/components/fulcrum/ChatView'
import CodeView from '@/components/fulcrum/CodeView'

const Workspace = () => {
    return (
        <div className='p-8'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
                <div>
                    <ChatView />
                </div>
                <div className='col-span-2'>
                    <CodeView />
                </div>
            </div>
        </div>
    )
}

export default Workspace

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  return []
}
