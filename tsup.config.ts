import { BLUE, GREEN, RED, RESET } from '@lib/colors.js';
import { isProd } from '@lib/config.js';
import { spawn } from 'node:child_process';
import { defineConfig } from 'tsup';

import type { ChildProcess } from 'node:child_process';

const config = defineConfig((options) => ({
	entry: ['./src/main.ts'],
	outDir: './dist',
	target: ['node18'],
	format: ['esm'],
	minify: isProd,
	treeshake: 'recommended',

	clean: true,
	sourcemap: !isProd,

	async onSuccess() {
		if (options.watch) {
			const script = runNode('./dist/main.js');
			script.on('spawn', () => {
				console.log();
				logApp('Run ./dist/main.js', BLUE);
			});
			script.on('exit', (exitCode) => {
				if (exitCode === 0) {
					logApp('Clean exit\n', GREEN);
				} else {
					logApp(`App crashed with code ${exitCode}\n`, RED);
				}
			});
		}
	},
}));

function logApp(message: string, color: string) {
	console.log(color + 'APP ' + RESET + message);
}

function runNode(scriptPath: string): ChildProcess {
	return spawn('node', [scriptPath], { stdio: 'inherit' });
}

export default config;
