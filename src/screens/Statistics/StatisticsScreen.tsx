import { GridPaper } from '../../components/GridPaper/GridPaper';

export const StatisticsScreen = () => {
  return (
    <div className="flex flex-col gap-5 h-full overflow-scroll" style={{ clipPath: 'inset(0)' }}>
      <h1 className="text-4xl font-bold text-green">Statistics</h1>

      <div className="flex w-full gap-5 [&>div]:flex [&>div]:justify-center [&>div]:items-center [&>div]:w-30 [&>div]:aspect-square [&>div]:rounded-full [&>div]:text-4xl [&>div]:font-bold">
        <div className="bg-green text-light-pink">+7</div>
        <div className="bg-yellow text-dark-pink">+5</div>
        <div className="bg-dark-pink text-light-pink">+1</div>
      </div>

      <GridPaper id={'weekly-stats'} offset={0} className={'z-10'}>
        <div className="pl-5 pr-25">
          <h1 className="text-4xl font-bold text-green text-left">Weekly</h1>

          <div className="flex justify-between w-full">
            {['mon', 'tue', 'wed', 'thu', 'fri'].map((title: string) => {
              const random = Math.fround(Math.random() * 100);

              return (
                <div className="w-13">
                  <div className="h-25 flex items-end">
                    <div className="bg-green rounded-lg w-full" style={{ height: `${random}%` }}></div>
                  </div>
                  <div className="text-green font-bold text-2xl">{title}</div>
                </div>
              );
            })}
          </div>
        </div>
      </GridPaper>

      <GridPaper id={'weekly-stats'} offset={0} className={'z-10'}>
        <div className="pl-5 pr-25">
          <h1 className="text-4xl font-bold text-green text-left">Monthly</h1>

          <div className='flex justify-around'>
            <div className='[&>div]:w-8 [&>div]:h-8'>
                <div className='bg-red'></div>
                <div className='bg-yellow'></div>
                <div className='bg-light-green'></div>
            </div>

            <div className='h-60'>
                
                <div className='grid grid-cols-7 gap-0'>
                    {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31].map((index: number) => {

                        return (
                            <div className={`w-8 h-8 bg-red ${index > 11 && index < 24 ? "bg-yellow" : "bg-green!"}`}></div>
                        )
                    })}
                </div>
            </div>
          </div>
        </div>
      </GridPaper>
    </div>
  );
};
