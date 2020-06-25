<div class="panel">
    <label for="level">{{__ "Level"}}</label>
    <span class="icon-help tooltipstered" data-tooltip="~ .tooltip-content:first" data-tooltip-theme="info"></span>
    <span class="tooltip-content">{{__ "Scale size"}}</span>
    <select name="level" class="select2" data-has-search="false">
        {{#each levels}}
        <option value="{{@key}}" {{#if selected}}selected="selected" {{/if}}>{{label}}</option>
        {{/each}}
    </select>
</div>

<div class="panel">
    <label for="alignment">{{__ "Align Choices"}}</label>
    <span class="icon-help tooltipstered" data-tooltip="~ .tooltip-content:first" data-tooltip-theme="info"></span>
    <span class="tooltip-content">{{__ "Align the choices horizontally or vertically"}}</span>
    <select name="alignment" class="select2" data-has-search="false">
        {{#each alignments}}
        <option value="{{@key}}" {{#if selected}}selected="selected" {{/if}}>{{label}}</option>
        {{/each}}
    </select>
</div>

<hr />
<div class="panel">
    <h3>{{__ 'Orientation'}}</h3>
    <span class="icon-help tooltipstered" data-tooltip="~ .tooltip-content" data-tooltip-theme="info"></span>
    <span class="tooltip-content">
        {{__ 'Display the choices either horizontally or vertically'}}
    </span>
    <div>
        <label class="smaller-prompt">
            <input type="radio" name="orientation" value="vertical" {{#unless horizontal}}checked{{/unless}} />
            <span class="icon-radio"></span>
            {{__ 'Vertical'}}
        </label>
        <br>
        <label class="smaller-prompt">
            <input type="radio" name="orientation" value="horizontal" {{#if horizontal}}checked{{/if}} />
            <span class="icon-radio"></span>
            {{__ 'Horizontal'}}
        </label>
    </div>
</div>