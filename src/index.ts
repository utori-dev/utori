require('yargs')
  .scriptName('utori')
  .usage('Usage: $0')
  .command('$0', 'Simple CLI tool', {
    help: {
      default: true,
    },
  })
  .help()
  .strict()
  .epilog('Copyright 2022').argv;
