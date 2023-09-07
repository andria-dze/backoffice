import * as bcrypt from 'bcrypt';

export async function hashInput(
  input: string,
  saltRounds = 10,
): Promise<string> {
  return await new Promise((resolve, reject) => {
    bcrypt.hash(input, saltRounds, function (err, hash) {
      if (err) reject(err);
      resolve(hash);
    });
  });
}
