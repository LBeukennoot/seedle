import { PlantElement } from "../PlantElement"
import type { Plant } from "../PlantElement/types"

type GardenProps = {
    gardenId: string
    plants: Plant[]
}

export const Garden = ({ gardenId, plants }: GardenProps) => {



    return (
        <div>
            {
                plants.map((plant: Plant) => {

                    if (plant.gardenId !== gardenId) return

                    return (
                        <div
                            key={plant.id}
                            className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                            style={{
                                left: `${plant.x * 100}%`,
                                top: `${plant.y * 100}%`,
                            }}
                        >
                            <div className="w-20 h-20 flex justify-center items-center" style={{transform: plant.mirrored? "scaleX(-1)" : ""}}>
                                <PlantElement stage={plant.stage} plant={plant.name} />
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}