import { PlantElement } from "../PlantElement"
import type { Plant } from "../PlantElement/types"

type GardenProps = {
    gardenId: string
    plants: Plant[]
}

export const Garden = ({ gardenId, plants }: GardenProps) => {

    const visiblePlants = plants
        .filter((plant) => plant.gardenId === gardenId)
        .sort((a, b) => a.y - b.y) // smaller y first, larger y last

    return (
        <div>
            {visiblePlants.map((plant: Plant) => (
                <div
                    key={plant.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center animate-plantmove"
                    style={{
                        left: `${(plant.x * 100) + (Math.random() * 2)}%`,
                        top: `${(plant.y * 100) + (Math.random() * 2)}%`,
                        animationDelay: `${(plant.x * 3) + plant.y}s`,
                    }}
                >
                    {/* TODO naamkaartje laten zien op hover (incl animatie) */}
                    {/* <div>
                        <svg width="36" height="109" viewBox="0 0 36 109" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.28931e-06 12C5.8687e-06 5.37258 5.37259 -5.79387e-07 12 0L24 1.04907e-06C30.6274 1.62846e-06 36 5.37259 36 12L36 72.5027C36 75.4639 35.3424 78.3882 34.0748 81.0644L22.5187 105.461C20.7126 109.273 15.2873 109.273 13.4813 105.461L1.92524 81.0644C0.657575 78.3882 -2.58879e-07 75.4639 0 72.5027L5.28931e-06 12Z" fill="#DB9A89" />
                        </svg>

                    </div> */}
                    <div
                        className="w-20 h-20 flex justify-center items-center"
                        style={{ transform: plant.mirrored ? "scaleX(-1)" : "" }}
                    >
                        <PlantElement stage={plant.stage} plant={plant.name} />
                    </div>
                </div>
            ))}
        </div>
    )
}