import { Disclosure } from "@headlessui/react"
import { ChevronUp } from "react-feather"

export default function ExerciseListItem({title}) {
	return (
		<div className="bg-red-200">
			<Disclosure>
				{({open})=>(
					<>
						<Disclosure.Button className="flex w-full justify-between bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
							<span>{title}</span>
							<ChevronUp
								className={`${
									open ? 'rotate-180 transform' : ''
								} h-5 w-5 text-white`}
							/>
						</Disclosure.Button>
						<Disclosure.Panel>
							blah blah blah
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>
		</div>
	)
}
