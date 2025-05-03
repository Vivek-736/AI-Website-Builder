import ChatView from '@/components/fulcrum/ChatView'
import CodeView from '@/components/fulcrum/CodeView'
import { GetStaticPaths, GetStaticProps } from 'next'

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

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props: {}
    }
}

export default Workspace
