## v1.16.5

[compare changes](https://github.com/ANLTD/ancore/compare/v1.16.4...v1.16.5)

### 🩹 Fixes

- **AnDropdown:** Disable teleport on server to prevent hydration mismatch ([659173c](https://github.com/ANLTD/ancore/commit/659173c))
- **AnDropdown:** Disable teleport on server to prevent hydration mismatch ([53e19ab](https://github.com/ANLTD/ancore/commit/53e19ab))
- **AnDropdown:** Use useMounted for teleport SSR fix ([96c9859](https://github.com/ANLTD/ancore/commit/96c9859))

### 🏡 Chore

- Update dependencies ([72020c6](https://github.com/ANLTD/ancore/commit/72020c6))

### ❤️ Contributors

- An Ltd ([@ANLTD](https://github.com/ANLTD))

## v1.16.4

[compare changes](https://github.com/ANLTD/ancore/compare/v1.16.3...v1.16.4)

### 🩹 Fixes

- **AnDropdown:** Resolve SSR hydration mismatch ([5955d19](https://github.com/ANLTD/ancore/commit/5955d19))

### 🏡 Chore

- Add .claude to .gitignore ([ad10266](https://github.com/ANLTD/ancore/commit/ad10266))

### ❤️ Contributors

- An Ltd ([@ANLTD](https://github.com/ANLTD))

## v1.16.3

[compare changes](https://github.com/ANLTD/ancore/compare/v1.16.2...v1.16.3)

### 🔥 Performance

- Use WeakMap for i18n namespace instead of JSON.stringify ([e8b8e90](https://github.com/ANLTD/ancore/commit/e8b8e90))

### 🩹 Fixes

- Decouple ModuleOptions from PublicRuntimeConfig i18n type ([e52df5f](https://github.com/ANLTD/ancore/commit/e52df5f))

### 💅 Refactors

- Use getters/setters in useAnData and useAnList ([99d20a6](https://github.com/ANLTD/ancore/commit/99d20a6))
- Replace uuid with crypto.randomUUID() ([d08e631](https://github.com/ANLTD/ancore/commit/d08e631))

### 📖 Documentation

- Update playground examples for new API ([14bc075](https://github.com/ANLTD/ancore/commit/14bc075))

### ❤️ Contributors

- An Ltd ([@ANLTD](https://github.com/ANLTD))

## v1.16.2

[compare changes](https://github.com/ANLTD/ancore/compare/v1.16.1...v1.16.2)

### 🩹 Fixes

- Scroll lock in useAnDialogs ([cf3e2e4](https://github.com/ANLTD/ancore/commit/cf3e2e4))

### 🏡 Chore

- Add npm login to release scripts ([af73019](https://github.com/ANLTD/ancore/commit/af73019))
- Update dependencies ([41b0943](https://github.com/ANLTD/ancore/commit/41b0943))

### ❤️ Contributors

- An Ltd ([@ANLTD](https://github.com/ANLTD))

## v1.16.1

[compare changes](https://github.com/ANLTD/ancore/compare/v1.17.0...v1.16.1)

### 🚀 Enhancements

- Escape key, ARIA and expose in AnDropdown ([020faca](https://github.com/ANLTD/ancore/commit/020faca))

### 🩹 Fixes

- Version ([037a61d](https://github.com/ANLTD/ancore/commit/037a61d))
- Language switching in useAnI18n ([511630f](https://github.com/ANLTD/ancore/commit/511630f))
- Close safety and types in useAnDialogs ([1fcd523](https://github.com/ANLTD/ancore/commit/1fcd523))
- Dialog backdrop close and stacking ([f1146bd](https://github.com/ANLTD/ancore/commit/f1146bd))

### 💅 Refactors

- Improve types and dedup fetch in useAnData ([bbf188c](https://github.com/ANLTD/ancore/commit/bbf188c))
- Remove dead try-catch in coreApi ([298baf4](https://github.com/ANLTD/ancore/commit/298baf4))
- Improve types and add TUseAnList interface ([0824766](https://github.com/ANLTD/ancore/commit/0824766))
- Remove any casts in AnTab ([9564dfc](https://github.com/ANLTD/ancore/commit/9564dfc))
- Replace any with unknown in useAnForm ([71f01c9](https://github.com/ANLTD/ancore/commit/71f01c9))
- Fix types in module and type definitions ([c8c8b55](https://github.com/ANLTD/ancore/commit/c8c8b55))

### 📖 Documentation

- Update README with module description and API list ([02e278f](https://github.com/ANLTD/ancore/commit/02e278f))

### 🏡 Chore

- Restructure playground with pages and examples ([180bf0b](https://github.com/ANLTD/ancore/commit/180bf0b))

### ❤️ Contributors

- An Ltd ([@ANLTD](https://github.com/ANLTD))

## v1.17.0

[compare changes](https://github.com/ANLTD/ancore/compare/v1.16.0...v1.17.0)

## v1.16.0

[compare changes](https://github.com/ANLTD/ancore/compare/v1.15.11...v1.16.0)

### 🚀 Enhancements

- New component AnDropdown ([395bc3f](https://github.com/ANLTD/ancore/commit/395bc3f))

### ❤️ Contributors

- An Ltd ([@ANLTD](https://github.com/ANLTD))

## v1.15.11

[compare changes](https://github.com/ANLTD/ancore/compare/v1.15.10...v1.15.11)

## v1.15.10

[compare changes](https://github.com/ANLTD/ancore/compare/v1.15.9...v1.15.10)

### 🩹 Fixes

- Type for i18n ([103d515](https://github.com/ANLTD/ancore/commit/103d515))

### ❤️ Contributors

- An Ltd ([@ANLTD](https://github.com/ANLTD))

## v1.15.9

[compare changes](https://github.com/ANLTD/ancore/compare/v1.15.8...v1.15.9)

### 🩹 Fixes

- Correct params definition in useAnData ([ea6c6d7](https://github.com/ANLTD/ancore/commit/ea6c6d7))

### 💅 Refactors

- Refine type definitions for i18n ([2fe7c18](https://github.com/ANLTD/ancore/commit/2fe7c18))

### 📦 Build

- Upgrade Nuxt to 4.3.0 ([73cdaf0](https://github.com/ANLTD/ancore/commit/73cdaf0))

### ❤️ Contributors

- An Ltd ([@ANLTD](https://github.com/ANLTD))

## v1.15.8

[compare changes](https://github.com/ANLTD/ancore/compare/v1.15.7...v1.15.8)

### 🩹 Fixes

- Fix params's type of useAnList ([5dc2105](https://github.com/ANLTD/ancore/commit/5dc2105))
- Clear error of only changed field in useAnForm ([b7e50c2](https://github.com/ANLTD/ancore/commit/b7e50c2))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.15.7

[compare changes](https://github.com/ANLTD/ancore/compare/v1.15.6...v1.15.7)

### 🩹 Fixes

- InfiniteScroll load in nextTick ([dbcdfd8](https://github.com/ANLTD/ancore/commit/dbcdfd8))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.15.6

[compare changes](https://github.com/ANLTD/ancore/compare/v1.15.5...v1.15.6)

### 🩹 Fixes

- InfiniteScroll load in nextTick ([e2394a7](https://github.com/ANLTD/ancore/commit/e2394a7))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.15.5

[compare changes](https://github.com/ANLTD/ancore/compare/v1.15.4...v1.15.5)

### 🩹 Fixes

- InfiniteScroll load in nextTick ([d3ef11a](https://github.com/ANLTD/ancore/commit/d3ef11a))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.15.4

[compare changes](https://github.com/ANLTD/ancore/compare/v1.15.3...v1.15.4)

### 🩹 Fixes

- InfiniteScroll load in nextTick ([4ed34f7](https://github.com/ANLTD/ancore/commit/4ed34f7))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.15.3

[compare changes](https://github.com/ANLTD/ancore/compare/v1.15.2...v1.15.3)

### 🩹 Fixes

- Hide scroll before animation AnDialogs ([8ec7ff1](https://github.com/ANLTD/ancore/commit/8ec7ff1))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.15.2

[compare changes](https://github.com/ANLTD/ancore/compare/v1.15.1...v1.15.2)

### 🚀 Enhancements

- Add transition-group for AnDialogs ([38b5175](https://github.com/ANLTD/ancore/commit/38b5175))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.15.1

[compare changes](https://github.com/ANLTD/ancore/compare/v1.15.0...v1.15.1)

### 🩹 Fixes

- Close dialog ([f1b4167](https://github.com/ANLTD/ancore/commit/f1b4167))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.15.0

[compare changes](https://github.com/ANLTD/ancore/compare/v1.14.3...v1.15.0)

### 🚀 Enhancements

- New component AnDialogs and useAnDialogs ([aa579c0](https://github.com/ANLTD/ancore/commit/aa579c0))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.14.3

[compare changes](https://github.com/ANLTD/ancore/compare/v1.14.2...v1.14.3)

### 🩹 Fixes

- CanLoadMore in infiniteScroll ([4340567](https://github.com/ANLTD/ancore/commit/4340567))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.14.2

[compare changes](https://github.com/ANLTD/ancore/compare/v1.14.1...v1.14.2)

### 🩹 Fixes

- CanLoadMore in infiniteScroll ([d47106c](https://github.com/ANLTD/ancore/commit/d47106c))

### 📦 Build

- Update package ([2c13c3b](https://github.com/ANLTD/ancore/commit/2c13c3b))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.14.1

[compare changes](https://github.com/ANLTD/ancore/compare/v1.14.0...v1.14.1)

### 🚀 Enhancements

- Remove meta field in useAnList ([e437c46](https://github.com/ANLTD/ancore/commit/e437c46))

### 📦 Build

- Update package ([56eb964](https://github.com/ANLTD/ancore/commit/56eb964))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.14.0

[compare changes](https://github.com/ANLTD/ancore/compare/v1.13.3...v1.14.0)

### 🚀 Enhancements

- Add meta field in useAnList ([6d60565](https://github.com/ANLTD/ancore/commit/6d60565))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.13.3

[compare changes](https://github.com/ANLTD/ancore/compare/v1.13.2...v1.13.3)

### 🩹 Fixes

- UseAnData.refresh double request ([3baef39](https://github.com/ANLTD/ancore/commit/3baef39))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.13.2

[compare changes](https://github.com/ANLTD/ancore/compare/v1.13.1...v1.13.2)

### 🩹 Fixes

- Default state from data in useAnForm ([fc60687](https://github.com/ANLTD/ancore/commit/fc60687))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.13.1

[compare changes](https://github.com/ANLTD/ancore/compare/v1.13.0...v1.13.1)

### 📦 Build

- Updated package ([c0bcb16](https://github.com/ANLTD/ancore/commit/c0bcb16))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.13.0

[compare changes](https://github.com/ANLTD/ancore/compare/v1.12.2...v1.13.0)

### 🚀 Enhancements

- Refresh method in useAnData ([2a20a9c](https://github.com/ANLTD/ancore/commit/2a20a9c))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.12.2

[compare changes](https://github.com/ANLTD/ancore/compare/v1.12.1...v1.12.2)

### 💅 Refactors

- Type of data useAnForm feat: useAnList.infiniteScroll return reset ([a7b5a1d](https://github.com/ANLTD/ancore/commit/a7b5a1d))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.12.1

[compare changes](https://github.com/ANLTD/ancore/compare/v1.12.0...v1.12.1)

### 💅 Refactors

- Code style ([2f29dd9](https://github.com/ANLTD/ancore/commit/2f29dd9))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.12.0

[compare changes](https://github.com/ANLTD/ancore/compare/v1.11.1...v1.12.0)

### 🚀 Enhancements

- TArgument - new ts generic function ([905ab7f](https://github.com/ANLTD/ancore/commit/905ab7f))
- InfiniteScroll - new method of useAnList. Wrapper over useInfiniteScroll for a list. ([70dbac9](https://github.com/ANLTD/ancore/commit/70dbac9))

### 🩹 Fixes

- InfiniteScroll in onMounted ([81b31bd](https://github.com/ANLTD/ancore/commit/81b31bd))

### 💅 Refactors

- Rename types files ([0f15a15](https://github.com/ANLTD/ancore/commit/0f15a15))
- Type of data useAnForm feat: diff - new computed in useAnForm ([1cf652d](https://github.com/ANLTD/ancore/commit/1cf652d))

### 📦 Build

- Updated package and nuxt to 4.2 ([bb13236](https://github.com/ANLTD/ancore/commit/bb13236))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.11.1

[compare changes](https://github.com/ANLTD/ancore/compare/v1.11.0...v1.11.1)

## v1.11.0

[compare changes](https://github.com/ANLTD/ancore/compare/v1.10.9...v1.11.0)

## v1.10.9

[compare changes](https://github.com/ANLTD/ancore/compare/v1.10.8...v1.10.9)

### 💅 Refactors

- Remove js-sha256 lib ([58a0ec7](https://github.com/ANLTD/ancore/commit/58a0ec7))
- Remove js-sha256 lib ([0ff8735](https://github.com/ANLTD/ancore/commit/0ff8735))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.10.8

[compare changes](https://github.com/ANLTD/ancore/compare/v1.10.7...v1.10.8)

### 💅 Refactors

- Change js-sha256 lib ([e1f0eb8](https://github.com/ANLTD/ancore/commit/e1f0eb8))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.10.7

[compare changes](https://github.com/ANLTD/ancore/compare/v1.10.6...v1.10.7)

### 💅 Refactors

- UseAnForm now takes structure as the first argument and data as the second argument. ([142a77e](https://github.com/ANLTD/ancore/commit/142a77e))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.10.6

[compare changes](https://github.com/ANLTD/ancore/compare/v1.10.5...v1.10.6)

### 💅 Refactors

- Handling the warning in useAnData when it’s called after mounting Fixed: fix type of TForm in useAnForm ([04f91f2](https://github.com/ANLTD/ancore/commit/04f91f2))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.10.5

[compare changes](https://github.com/ANLTD/ancore/compare/v1.10.4...v1.10.5)

## v1.10.4

[compare changes](https://github.com/ANLTD/ancore/compare/v1.10.3...v1.10.4)

## v1.10.3

[compare changes](https://github.com/ANLTD/ancore/compare/v1.10.2...v1.10.3)

## v1.10.2

[compare changes](https://github.com/ANLTD/ancore/compare/v1.10.1...v1.10.2)

## v1.10.1

[compare changes](https://github.com/ANLTD/ancore/compare/v1.10.0...v1.10.1)

## v1.10.0

[compare changes](https://github.com/ANLTD/ancore/compare/v1.9.6...v1.10.0)

### 🩹 Fixes

- Changelog ([b2b2210](https://github.com/ANLTD/ancore/commit/b2b2210))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.9.4

[compare changes](https://github.com/ANLTD/ancore/compare/v1.9.3...v1.9.4)

### 🩹 Fixes

- GetJSONHash change lib ([3e86c77](https://github.com/ANLTD/ancore/commit/3e86c77))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.9.3

[compare changes](https://github.com/ANLTD/ancore/compare/v1.9.2...v1.9.3)

### 🩹 Fixes

- GetJSONHash remove async ([c6f39a2](https://github.com/ANLTD/ancore/commit/c6f39a2))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.9.2

[compare changes](https://github.com/ANLTD/ancore/compare/v1.9.1...v1.9.2)

### 🩹 Fixes

- GetJSONHash await crypto hash ([ac03d0d](https://github.com/ANLTD/ancore/commit/ac03d0d))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.9.1

[compare changes](https://github.com/ANLTD/ancore/compare/v1.9.0...v1.9.1)

### 🩹 Fixes

- GetJSONHash import SHA256 ([f9de2b9](https://github.com/ANLTD/ancore/commit/f9de2b9))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.9.0

[compare changes](https://github.com/ANLTD/ancore/compare/v1.8.7...v1.9.0)

### 🚀 Enhancements

- New util getJSONHash fix: useAnI18n ns ([07902ae](https://github.com/ANLTD/ancore/commit/07902ae))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.8.7

[compare changes](https://github.com/ANLTD/ancore/compare/v1.8.6...v1.8.7)

### 🩹 Fixes

- UseAnData type data ([71c3da1](https://github.com/ANLTD/ancore/commit/71c3da1))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.8.6

[compare changes](https://github.com/ANLTD/ancore/compare/v1.8.5...v1.8.6)

### 🩹 Fixes

- UseAnData type data ([20a7378](https://github.com/ANLTD/ancore/commit/20a7378))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.8.5

[compare changes](https://github.com/ANLTD/ancore/compare/v1.8.4...v1.8.5)

### 🩹 Fixes

- UseAnData useAnList events types ([2c7b69b](https://github.com/ANLTD/ancore/commit/2c7b69b))
- UseAnData useAnList events types ([6a82b85](https://github.com/ANLTD/ancore/commit/6a82b85))
- Remove events from useAnData useAnList ([d7ec0ff](https://github.com/ANLTD/ancore/commit/d7ec0ff))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.8.4

[compare changes](https://github.com/ANLTD/ancore/compare/v1.8.3...v1.8.4)

### 🩹 Fixes

- UseAnData useAnList events types ([a417ac4](https://github.com/ANLTD/ancore/commit/a417ac4))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.8.3

[compare changes](https://github.com/ANLTD/ancore/compare/v1.8.2...v1.8.3)

### 🩹 Fixes

- UseAnData useAnList events types ([6145664](https://github.com/ANLTD/ancore/commit/6145664))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.8.2

[compare changes](https://github.com/ANLTD/ancore/compare/v1.8.1...v1.8.2)

### 🩹 Fixes

- UseAnData useAnList events ([4a7a9c2](https://github.com/ANLTD/ancore/commit/4a7a9c2))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.8.1

[compare changes](https://github.com/ANLTD/ancore/compare/v1.8.0...v1.8.1)

### 🩹 Fixes

- UseAnData useAnList events ([ef4afbd](https://github.com/ANLTD/ancore/commit/ef4afbd))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.8.0

[compare changes](https://github.com/ANLTD/ancore/compare/v1.7.5...v1.8.0)

### 🚀 Enhancements

- UseAnData new method set ([be68be7](https://github.com/ANLTD/ancore/commit/be68be7))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.7.5

[compare changes](https://github.com/ANLTD/ancore/compare/v1.7.4...v1.7.5)

### 🩹 Fixes

- UseAnData events types add null ([9756360](https://github.com/ANLTD/ancore/commit/9756360))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.7.4

[compare changes](https://github.com/ANLTD/ancore/compare/v1.7.3...v1.7.4)

### 🩹 Fixes

- UseAnData events types ([597d2d4](https://github.com/ANLTD/ancore/commit/597d2d4))
- UseAnData events types ([9e8a516](https://github.com/ANLTD/ancore/commit/9e8a516))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.7.3

[compare changes](https://github.com/ANLTD/ancore/compare/v1.7.2...v1.7.3)

### 🩹 Fixes

- UseAnData events updated is Partial ([9755cd9](https://github.com/ANLTD/ancore/commit/9755cd9))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.7.2

[compare changes](https://github.com/ANLTD/ancore/compare/v1.7.1...v1.7.2)

### 🩹 Fixes

- Events in useAnData fix: remove ws from useAnList ([6606bdf](https://github.com/ANLTD/ancore/commit/6606bdf))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.7.1

[compare changes](https://github.com/ANLTD/ancore/compare/v1.7.0...v1.7.1)

## v1.7.0

[compare changes](https://github.com/ANLTD/ancore/compare/v1.6.0...v1.7.0)

### 🚀 Enhancements

- OnResponse in useAnData fix: renderRaw to onResponse in useAnList ([2c071b1](https://github.com/ANLTD/ancore/commit/2c071b1))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.6.0

[compare changes](https://github.com/ANLTD/ancore/compare/v1.5.1...v1.6.0)

### 🚀 Enhancements

- RenderRaw in useAnList ([3e41455](https://github.com/ANLTD/ancore/commit/3e41455))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.5.1

[compare changes](https://github.com/ANLTD/ancore/compare/v1.5.0...v1.5.1)

### 🩹 Fixes

- Nuxtconfig ([2713a7d](https://github.com/ANLTD/ancore/commit/2713a7d))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.5.0

[compare changes](https://github.com/ANLTD/ancore/compare/v1.4.7...v1.5.0)

### 🚀 Enhancements

- Added reset function in useAnForm ([a969d09](https://github.com/ANLTD/ancore/commit/a969d09))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.4.7

[compare changes](https://github.com/ANLTD/ancore/compare/v1.4.6...v1.4.7)

## v1.4.6

[compare changes](https://github.com/ANLTD/ancore/compare/v1.4.5...v1.4.6)

### 🩹 Fixes

- Fix destructuring useAsyncData ([a10a81a](https://github.com/ANLTD/ancore/commit/a10a81a))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.4.5

[compare changes](https://github.com/ANLTD/ancore/compare/v1.4.4...v1.4.5)

### 🩹 Fixes

- Fix destructuring useAsyncData ([d9878b0](https://github.com/ANLTD/ancore/commit/d9878b0))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.4.4

[compare changes](https://github.com/ANLTD/ancore/compare/v1.4.3...v1.4.4)

### 🩹 Fixes

- Fix types in toQuery ([75e3960](https://github.com/ANLTD/ancore/commit/75e3960))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.4.3

[compare changes](https://github.com/ANLTD/ancore/compare/v1.4.2...v1.4.3)

### 🩹 Fixes

- Name addPlugin i18n ([d4b208b](https://github.com/ANLTD/ancore/commit/d4b208b))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.4.2

[compare changes](https://github.com/ANLTD/ancore/compare/v1.4.1...v1.4.2)

### 🩹 Fixes

- Json import resource for i18n ([e1b1f89](https://github.com/ANLTD/ancore/commit/e1b1f89))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.4.1

[compare changes](https://github.com/ANLTD/ancore/compare/v1.4.0...v1.4.1)

### 🩹 Fixes

- Absolute import file in i18n ([867fe29](https://github.com/ANLTD/ancore/commit/867fe29))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.4.0

[compare changes](https://github.com/ANLTD/ancore/compare/v1.3.6...v1.4.0)

### 🚀 Enhancements

- Added i18next ([7c8380a](https://github.com/ANLTD/ancore/commit/7c8380a))
- Added component AnTab ([c31f775](https://github.com/ANLTD/ancore/commit/c31f775))

### 💅 Refactors

- Added aliases for use ([ed303f9](https://github.com/ANLTD/ancore/commit/ed303f9))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.3.6

[compare changes](https://github.com/ANLTD/ancore/compare/v1.3.5...v1.3.6)

### 🩹 Fixes

- Fix import custom api ([4d8e3f1](https://github.com/ANLTD/ancore/commit/4d8e3f1))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.3.5

[compare changes](https://github.com/ANLTD/ancore/compare/v1.3.4...v1.3.5)

## v1.3.4

[compare changes](https://github.com/ANLTD/ancore/compare/v1.3.3...v1.3.4)

### 🩹 Fixes

- Fix import utils ([49f2d17](https://github.com/ANLTD/ancore/commit/49f2d17))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.3.3

[compare changes](https://github.com/ANLTD/ancore/compare/v1.3.2...v1.3.3)

### 🩹 Fixes

- Fix $api type ([eb44154](https://github.com/ANLTD/ancore/commit/eb44154))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.3.2

[compare changes](https://github.com/ANLTD/ancore/compare/v1.3.1...v1.3.2)

### 📦 Build

- Auto import utils ([de190dc](https://github.com/ANLTD/ancore/commit/de190dc))
- Auto import utils ([bba1076](https://github.com/ANLTD/ancore/commit/bba1076))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.3.1

[compare changes](https://github.com/ANLTD/ancore/compare/v1.3.0...v1.3.1)

### 📦 Build

- Fix export utils ([49a0c42](https://github.com/ANLTD/ancore/commit/49a0c42))
- Fix export utils ([78c1399](https://github.com/ANLTD/ancore/commit/78c1399))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.3.0

[compare changes](https://github.com/ANLTD/ancore/compare/v1.2.0...v1.3.0)

### 🚀 Enhancements

- Add asyncInit and toQuery functions feat: add useForm and useList composables ([84bd1f0](https://github.com/ANLTD/ancore/commit/84bd1f0))

### 💅 Refactors

- Added aliases #ancore/utils and #ancore/types refactor: improved internal module architecture ([73ac7f4](https://github.com/ANLTD/ancore/commit/73ac7f4))

### 📦 Build

- Fix repack ([5bcedf6](https://github.com/ANLTD/ancore/commit/5bcedf6))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.2.0

[compare changes](https://github.com/ANLTD/ancore/compare/v1.1.3...v1.2.0)

### 🚀 Enhancements

- Add useData composable - refactor: improve coreApi method - refactor: add userApi.ts wrapper - chore: configure module function imports ([1d739fc](https://github.com/ANLTD/ancore/commit/1d739fc))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.1.3

[compare changes](https://github.com/ANLTD/ancore/compare/v1.1.2...v1.1.3)

## v1.1.2

[compare changes](https://github.com/ANLTD/ancore/compare/v1.1.1...v1.1.2)

## v1.1.1

[compare changes](https://github.com/ANLTD/ancore/compare/v1.1.0...v1.1.1)

### 📦 Build

- Api method import ([707e91d](https://github.com/ANLTD/ancore/commit/707e91d))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.1.0

[compare changes](https://github.com/ANLTD/ancore/compare/v1.0.2...v1.1.0)

### 🚀 Enhancements

- Api method ([6b43e85](https://github.com/ANLTD/ancore/commit/6b43e85))

### 📖 Documentation

- Update README ([8786ec7](https://github.com/ANLTD/ancore/commit/8786ec7))

### 📦 Build

- Fix v ([546db45](https://github.com/ANLTD/ancore/commit/546db45))
- Improve build ([446cf47](https://github.com/ANLTD/ancore/commit/446cf47))

### 🏡 Chore

- **release:** V1.0.3 ([b12016f](https://github.com/ANLTD/ancore/commit/b12016f))

### ❤️ Contributors

- An Ltd <contact@anweb.jp>

## v1.0.2

[compare changes](https://github.com/ANLTD/ancore/compare/v1.0.1...v1.0.2)

### 📖 Documentation

- Update README ([ae80dba](https://github.com/ANLTD/ancore/commit/ae80dba))

## v1.0.1
just template