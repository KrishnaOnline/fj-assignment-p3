const getWaterLevels = (height) => {
    let n=height.length, lMax=0, rMax=0;
    let res = new Array(n).fill(0);
    let leftMax = [];    
    for(let i=0; i<n; i++) {
        lMax = Math.max(lMax, height[i]);
        leftMax[i] = lMax;
    }
    let rightMax = [];
    for(let i=n-1; i>=0; i--) {
        rMax = Math.max(rMax, height[i]);
        rightMax[i] = rMax;
    }
    for(let i=0; i<n; i++) {
        let minMax = Math.min(leftMax[i], rightMax[i]);
        if(minMax > height[i]) {
            res[i] = minMax-height[i];
        }
    }
    console.log(res);
    return res;
}

const renderResult = (heights, waterLevels) => {
    const table = document.getElementById('bar-table');
    table.innerHTML = '';
    const maxHeight = Math.max(...heights.map((h, i) => h + waterLevels[i]))+1;
    for(let i=maxHeight; i>0; i--) {
        const row = document.createElement('tr');
        for(let j=0; j<heights.length; j++) {
            const cell = document.createElement('td');
            if(i<=heights[j]) {
                cell.classList.add('height-bar-cell');
            } else if(i<=heights[j]+waterLevels[j]) {
                cell.classList.add('water-bar-cell');
            } // else cell.classList.add('empty');
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    const totalRow = document.createElement('tr');
    for(let i=0; i<heights.length; i++) {
        const totalCell = document.createElement('th');
        totalCell.innerText = heights[i]+waterLevels[i];
        totalRow.appendChild(totalCell);
    }
    table.appendChild(totalRow);
}

const mainFunc = () => {
    const input = document.getElementById('heights-input').value;
    const heights = input.split(',').map(Number);
    const waterLevels = getWaterLevels(heights);
    const ans = waterLevels.reduce((acc, curr) => acc+curr, 0);
    document.getElementById('result').innerText = `Total Water Trapped: ${ans}`;
    renderResult(heights, waterLevels);
}