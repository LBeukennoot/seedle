import ReactMarkdown from 'react-markdown'
import changelog from '../../../../changelog.md?raw'
import { Button } from '../../../components/Button'

export const ChangelogScreen = () => {
    return (
        <div className="overflow-y-auto max-h-[25rem] rounded-b-[2.3rem] md:rounded-b-[1.4rem] text-blue font-lexend">
            <h1 className="text-3xl mb-5">changelog</h1>

            <div className='mb-8'>
                <Button label={"feedback"} onClick={() => window.open('https://github.com/LBeukennoot/seedle/issues', '_blank') }>give feedback</Button>
            </div>

            <div className='mb-8 lowercase'>
                <ReactMarkdown
                components={{
                    h1: ({node, ...props}) => <h1 className='text-xl font-bold' {...props}/>,
                    ul: ({node, ...props}) => <ul className='list-disc text-lg mb-8' {...props}/>,
                    li: ({node, ...props}) => <li className='ml-6 mb-1' {...props}/>,
                }}
                >{changelog}</ReactMarkdown>
            </div>

            <div className='mb-8'>
                <Button label={"credits"} onClick={() => window.open('https://iamlars.nl/about-me/', '_blank') }>seedle credits</Button>
            </div>

        </div>
    )
}

            // {Object.keys(data.data).map(key => {
            //     return (
            //         <div className='mb-8' key={key}>
            //             <h2 className="text-lg mb-3 font-bold">{key}</h2>
            //             {/* @ts-ignore */}
            //             <h3 className="text-lg whitespace-break-spaces max-w-[24rem]">{data.data[key]}</h3>
            //         </div>
            //     )
            // })}