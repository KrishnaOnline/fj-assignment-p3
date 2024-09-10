const getWaterLevels = (height) => {
    let n=height.length, lMax=0, rMax=0;
    let l=0, r=n-1;
    let res = new Array(n).fill(0);
    while(l<=r) {
        if(height[l] <= height[r]) {
            lMax = Math.max(lMax, height[l]);
            res[l] = lMax-height[l];
            l++;
        } else {
            rMax = Math.max(rMax, height[r]);
            res[r] = rMax-height[r];
            r--;
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