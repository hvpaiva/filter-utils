import { Config as Configuration } from 'bili';

const configuration: Configuration = {
  banner: true,
  input: 'src/index.ts',
  output: {
    format: [
      'es',
      'cjs',
      'umd',
      'umd-min'
    ],
    moduleName: 'filter-utils'
  },
  plugins: {
    'typescript2': {
      clean: true,
      useTsconfigDeclarationDir: true
    }
  }
};

export default configuration;
