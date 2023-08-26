import {
    ChartComponent,
    ApexAxisChartSeries,
    ApexChart,
    ApexXAxis,
    ApexDataLabels,
	ApexStroke,
	ApexPlotOptions,
    ApexYAxis,
    ApexTitleSubtitle,
    ApexLegend
} from "ng-apexcharts";

export const COLOR_1 = '#11a1fd';
export const COLOR_2 = '#00c569';
export const COLOR_3 = '#FFC833';
export const COLOR_4 = '#5a75f9';
export const COLOR_5 = '#e83e8c';

export const COLOR_1_LIGHT = 'rgba(62, 130, 247, 0.15)';
export const COLOR_2_LIGHT = 'rgba(4, 209, 130, 0.1)';
export const COLOR_3_LIGHT = 'rgba(222, 68, 54, 0.1)';
export const COLOR_4_LIGHT = 'rgba(255, 193, 7, 0.1)';
export const COLOR_5_LIGHT = 'rgba(139, 75, 157, 0.1)';

export const COLORS = [
	COLOR_1,
	COLOR_2,
	COLOR_3,
	COLOR_4,
	COLOR_5
]

export const COLORS_LIGHT = [
	COLOR_1_LIGHT,
	COLOR_2_LIGHT,
	COLOR_3_LIGHT,
	COLOR_4_LIGHT,
	COLOR_5_LIGHT
]

export const COLOR_AXES = '#edf2f9';
export const COLOR_TEXT = '#455560';


export const ApexStrokeDefault: ApexStroke = {
    width: 3,
    curve: "smooth",
    lineCap: 'round'
}

export const ApexChartDefault: ApexChart = {
    type: 'line',
    zoom: {
        enabled: false
    },
    toolbar: {
        show: false
    }
}

export const ApexDataLabelDefault: ApexDataLabels = {
    enabled: false
}

export const ApexColorDefault: string[] = [...COLORS]

export const ApexBarDefault: ApexPlotOptions = {
	bar: {
		horizontal: false,
		columnWidth: '25px',
        borderRadius: 4
	},
}
