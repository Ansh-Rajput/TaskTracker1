import { taskStates } from "../constants/tasks"
import { AddTaskButton } from "./AddTaskButton"
import { FilterContainor } from "./FilterContainor"
import { SortContainor } from "./SortContainor"
import { TaskStateContainor } from "./TaskStateContainor"

export const TaskContainor = () => {
    return (
        <div className="p-4 flex flex-col space-y-3 shadow-md h-full rounded-md">
            <div className="flex flex-col lg:flex-row gap-4 justify-between">
                <FilterContainor/>
                <AddTaskButton/>
            </div>
            <SortContainor/>
            <div className="flex-1 flex flex-col lg:flex-row gap-2 p-1 lg:overflow-hidden overflow-y-scroll hideScrollBar ">
                {
                    taskStates.map((state)=>(
                        <TaskStateContainor status={state.state} bgColor={state.bgColor} key={state.state}/>
                    ))
                }
            </div>
        </div>
    )
}