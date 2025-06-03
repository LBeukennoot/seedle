import * as data from '../../../changelog.json'

export default function ChangelogScreen() {
    return (
        <div className="overflow-y-auto max-h-[25rem] rounded-b-[2.3rem] md:rounded-b-[1.4rem]">
            <h1 className="text-3xl mb-5">changelog</h1>
            {Object.keys(data.data).map(key => {
                return (
                    <div className='mb-8' key={key}>
                        <h2 className="text-lg mb-3 font-bold">{key}</h2>
                        {/* @ts-ignore */}
                        <h3 className="text-lg whitespace-break-spaces max-w-[24rem]">{data.data[key]}</h3>
                    </div>
                )
            })}
        </div>
    )
}