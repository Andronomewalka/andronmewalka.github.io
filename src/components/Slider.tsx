import React, { FC, useId } from "react";
import * as RadixSlider from "@radix-ui/react-slider";

type SliderProps = {
	title?: string;
	value?: number;
	min?: number;
	max?: number;
	step?: number;
	onChange?: (value: number[]) => void;
};

export const Slider: FC<SliderProps> = ({
	title,
	value = 0,
	min = 0,
	max = 1,
	step = 0.01,
	onChange,
}) => {
	const id = useId();
	return (
		<form className="flex items-center gap-4">
			<label htmlFor={id} className=" w-20 text-white">
				{title}
			</label>
			<RadixSlider.Root
				id={id}
				className="relative flex h-5 w-[200px] touch-none select-none items-center"
				value={[value]}
				min={min}
				max={max}
				step={step}
				onValueChange={onChange}
			>
				<RadixSlider.Track className="relative h-[3px] grow rounded-full bg-blackA10">
					<RadixSlider.Range className="absolute h-full rounded-full bg-white" />
				</RadixSlider.Track>
				<RadixSlider.Thumb
					className="block h-5 w-5 rounded-[10px] bg-white shadow-[0_2px_10px] shadow-blackA7 hover:bg-violet3 focus:shadow-[0_0_0_5px] focus:shadow-blackA8 focus:outline-none"
					aria-label="Volume"
				/>
			</RadixSlider.Root>
		</form>
	);
};
