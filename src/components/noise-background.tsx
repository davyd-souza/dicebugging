export function NoiseBackground() {
	return (
		<svg className="sr-only">
			<title>grainy texture</title>

			<filter id="noiseFilter">
				<feTurbulence
					type="turbulence"
					baseFrequency={0.45}
					stitchTiles="stitch"
				/>
			</filter>
		</svg>
	)
}
