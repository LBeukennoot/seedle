import { useContext } from "react"
import ScreenCard from "./screens/ScreenCard"
import { TabList } from "../components/TabList"
import { NavigationContext } from "../providers/NavigationContext"
import { Popup } from "../components/Popup/Popup"
import { Garden } from "../components/Garden/Garden"
import { useUserData } from "../context/UserData"
import { type Plant } from "../components/PlantElement/types"

const COLS = 10
const ROWS = 5

const generateGridPositions = (cols: number, rows: number) => {
    const positions = []

    for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
            positions.push({
                x: (x + 0.5) / cols,
                y: (y + 0.5) / rows
            })
        }
    }

    return positions
}

const getFreePositions = (
    plants: Plant[],
    gardenId: string,
    cols: number,
    rows: number
) => {
    const gardenPlants = plants.filter(p => p.gardenId === gardenId)
    const all = generateGridPositions(cols, rows)

    return all.filter(pos =>
        !gardenPlants.some(p =>
            p.x === pos.x && p.y === pos.y
        )
    )
}

const GARDENS = ["A", "B"]

export const getRandomGardenAndPosition = (plants: Plant[]) => {
    // shuffle gardens so we try randomly
    const shuffledGardens = [...GARDENS].sort(() => Math.random() - 0.5)

    for (const gardenId of shuffledGardens) {
        const free = getFreePositions(plants, gardenId, COLS, ROWS)

        if (free.length > 0) {
            const pos = free[Math.floor(Math.random() * free.length)]
            return { gardenId, ...pos }
        }
    }

    throw new Error("All gardens are full 🌱")
}

export default function Navigation() {

    const { ScreenElement, popup } = useContext(NavigationContext)
    const { plants } = useUserData()

    return (
        <div className="min-h-screen grid grid-rows-[30vh_1fr_1fr] bg-light-green">

            {/* <DragDropProvider
                onDragEnd={(event) => {
                    console.log(event)
                }}
            > */}
            {/* top garden */}
            <div className="relative overflow-hidden h-full">
                <Garden
                    gardenId="A"
                    // plants={tempPlants}
                    plants={plants}
                // setPlants={setPlants}
                // updatePlant={updatePlant}
                // setPlants={setRewards}
                // drag={drag}
                // setDrag={setDrag}
                // getGardenUnderCursor={getGardenUnderCursor} // ✅ NEW
                />
            </div>

            <div className="relative flex items-start inset-0 flex items-center justify-center">
                <div className="max-w-xl w-full">
                    <div className="absolute z-20 max-w-xl w-full mt-15 md:mt-0">
                        <ScreenCard>
                            <ScreenElement />
                        </ScreenCard>
                    </div>

                    <div className="w-20 h-20 absolute top-0 -z-0 md:-ml-15">
                        <TabList />
                    </div>
                </div>
            </div>

            {popup && <Popup> {popup} </Popup>}

            {/* bottom garden */}
            <div className="relative overflow-hidden h-full">
                <Garden
                    gardenId="B"
                    // plants={tempPlants}
                    plants={plants}
                // setPlants={setPlants}
                // updatePlant={updatePlant}
                // setPlants={setRewards}
                // drag={drag}
                // setDrag={setDrag}
                // getGardenUnderCursor={getGardenUnderCursor} // ✅ NEW
                />
            </div>
            {/* </DragDropProvider> */}

        </div>
    )
}