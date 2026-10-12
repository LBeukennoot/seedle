import { CollectablesList } from "../../components/CollectablesList/CollectablesList"
import { GridPaper } from "../../components/GridPaper/GridPaper"

export const JourneyScreen = () => {

    return (
        <div className="flex flex-col h-full">
          <GridPaper id={"journey"} offset={-45} className={"z-10"}>
            <h1 className="text-4xl font-bold text-green">Journey</h1>
            <h1 className="text-4xl font-normal text-green">5/9</h1>
          </GridPaper>

          <div
            className="grow max-h-6/8 -my-10 max-w-5/6 overflow-hidden self-center bg-linear-to-b from-[#A4BD6D] to-light-green w-full overflow-y-scroll isolate"
            style={{ clipPath: 'inset(0)' }}>
            {' '}
            {/* clipPath is added because overflow-y-scroll doesnt work on its own. */}
            <CollectablesList />
          </div>

          <GridPaper id={"next"} offset={0} className={"z-10 flex"}>
            <h1 className="text-4xl font-bold text-green">Next</h1>
            <h1 className="text-4xl font-normal text-green">Chicory</h1>
          </GridPaper>
        </div>
    )
}