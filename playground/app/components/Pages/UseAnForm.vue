<script setup lang="ts">
	interface TUserForm {
		name: string
		email: string
		age: number
	}

	const Form = useAnForm<TUserForm>({
		name: {
			default: '',
			rules: [{ required: true, message: 'Name is required' }],
		},
		email: {
			default: '',
			rules: [
				{ required: true, message: 'Email is required' },
				{ type: 'email', message: 'Invalid email format' },
			],
		},
		age: {
			default: 18,
			rules: [
				{ type: 'number', required: true, message: 'Age is required' },
				{ type: 'number', min: 1, max: 120, message: 'Age must be 1-120' },
			],
		},
	})

	const onSubmit = async () => {
		const { pass } = await Form.validator.check()
		if (pass) {
			alert('Form is valid! Data: ' + JSON.stringify(Form.state.value))
		}
	}
</script>

<template>
	<div class="page">
		<h1 class="page__title">useAnForm</h1>
		<p class="page__desc">
			Form state management with async-validator validation, change history, diff tracking, and undo support.
		</p>

		<div class="section">
			<h3 class="section__title">Input (Params)</h3>
			<table class="api-table">
				<thead><tr><th>Param</th><th>Type</th><th>Description</th></tr></thead>
				<tbody>
					<tr><td><code>params</code></td><td><code>Record&lt;keyof TForm, TStructureItem&gt;</code></td><td>Field definitions with defaults and rules</td></tr>
					<tr><td><code>data</code></td><td><code>Partial&lt;TForm&gt;</code></td><td>Initial data to override defaults</td></tr>
				</tbody>
			</table>
			<p class="section__subtitle" style="margin-top: 8px"><code>TStructureItem</code> = <code>{ default: TData, rules?: RuleItem[] }</code></p>
		</div>

		<div class="section">
			<h3 class="section__title">Output (Return)</h3>
			<table class="api-table">
				<thead><tr><th>Field</th><th>Type</th><th>Description</th></tr></thead>
				<tbody>
					<tr><td><code>state</code></td><td><code>Ref&lt;TForm&gt;</code></td><td>Reactive form state</td></tr>
					<tr><td><code>diff</code></td><td><code>ComputedRef&lt;Partial&lt;TForm&gt;&gt;</code></td><td>Only changed fields</td></tr>
					<tr><td><code>merge(data, commit?)</code></td><td><code>Function</code></td><td>Merge data into state, optionally commit history</td></tr>
					<tr><td><code>validator.check()</code></td><td><code>() => Promise&lt;{ pass, errors }&gt;</code></td><td>Run async validation</td></tr>
					<tr><td><code>validator.errors</code></td><td><code>Ref&lt;Record&lt;key, string&gt;&gt;</code></td><td>Per-field error messages</td></tr>
					<tr><td><code>history.isChanged</code></td><td><code>ComputedRef&lt;boolean&gt;</code></td><td>Has the form been modified?</td></tr>
					<tr><td><code>history.reset()</code></td><td><code>() => void</code></td><td>Undo all changes</td></tr>
					<tr><td><code>history.commit()</code></td><td><code>() => void</code></td><td>Commit current state as baseline</td></tr>
				</tbody>
			</table>
		</div>

		<div class="section">
			<h3 class="section__title">Example: User form with validation</h3>
			<p class="section__subtitle">Fill out the form and submit. Errors clear as you type. Try history reset.</p>

			<div class="demo">
				<div class="status-bar">
					<span class="tag" :class="Form.history.isChanged.value ? 'tag--warning' : 'tag--success'">
						{{ Form.history.isChanged.value ? 'Changed' : 'Clean' }}
					</span>
				</div>

				<div class="field">
					<label class="field__label">Name</label>
					<input
						v-model="Form.state.value.name"
						class="input"
						:class="{ 'input--error': Form.validator.errors.value.name }"
						placeholder="Enter name"
					/>
					<div v-if="Form.validator.errors.value.name" class="error-text">
						{{ Form.validator.errors.value.name }}
					</div>
				</div>

				<div class="field">
					<label class="field__label">Email</label>
					<input
						v-model="Form.state.value.email"
						class="input"
						:class="{ 'input--error': Form.validator.errors.value.email }"
						placeholder="user@example.com"
					/>
					<div v-if="Form.validator.errors.value.email" class="error-text">
						{{ Form.validator.errors.value.email }}
					</div>
				</div>

				<div class="field">
					<label class="field__label">Age</label>
					<input
						v-model.number="Form.state.value.age"
						type="number"
						class="input"
						:class="{ 'input--error': Form.validator.errors.value.age }"
						style="width: 120px"
					/>
					<div v-if="Form.validator.errors.value.age" class="error-text">
						{{ Form.validator.errors.value.age }}
					</div>
				</div>

				<div style="margin-top: 16px">
					<button class="btn btn--primary" @click="onSubmit">Validate & Submit</button>
					<button class="btn btn--secondary" @click="Form.history.reset()">Reset</button>
					<button class="btn btn--secondary" @click="Form.history.commit()">Commit</button>
					<button class="btn btn--secondary" @click="Form.merge({ name: 'Bill', email: 'a@test.com', age: 25 })">
						Merge data
					</button>
				</div>

				<div v-if="Object.keys(Form.diff.value).length" style="margin-top: 16px">
					<strong style="font-size: 13px">Diff (changed fields):</strong>
					<pre style="background: #f4f5f7; padding: 12px; border-radius: 6px; font-size: 13px; margin-top: 4px">{{ JSON.stringify(Form.diff.value, null, 2) }}</pre>
				</div>
			</div>
		</div>
	</div>
</template>
